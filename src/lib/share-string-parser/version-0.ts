// Constants
const boardSize = 27; // The length of one row (the board is a square)

// Types
export type PlayerData = {
    timestamp: Date
    username: string
    uuid: string
    score: number
    textures: {
        skin: {
            texture: string,
            model: string
        }
        cape: string | null
    }
}

export type BoardTile = {
    type: "empty" | "doubleLetterScore" | "tripleLetterScore" | "plusThreeScore" | "plusEightScore" | "centerTile" | "filled"
    letter?: string
}

export type Version0ShareData = {
    version: number
    data: {
        instanceId: string
        sessionId: string
        winnerStageFakePlayersMessage: {
            firstMessage: string
            secondMessage: string 
        } | null
        configuration: {
            telemetryLevel: number
            lettersInBag: number
            enableSpecialTiles: boolean
        }
        statistics: {
            highestPlayerCount: number
            lobby: {
                gamesStarted: number
                timesClickedTutorial: number
                timesClickedTrailer: number
                timesClickedWebsite: number
                timesPlayedDisc: number
                timesStoppedDisc: number
            }
            game: {
                lengthInMiliseconds: number
                turns: number
            }
        }
        players: PlayerData[]
        boardState: {
            rows: BoardTile[][]
        }
    }
}

// See the decoded `textures` object here https://wiki.vg/Mojang_API#UUID_to_Profile_and_Skin.2FCape
type MojangProfile = {
    timestamp: number,
    profileId: string,
    profileName: string,
    signatureRequired: boolean,
    textures: {
        SKIN?: {
                url: string
                metadata?: {
                    model: string
                }
            }

        CAPE?: {
            url: string
        }
    }
}

export function parseVersion0ShareString(shareString: string): Version0ShareData {
    // The version 0 share string is made up of five sections, seperated by a `*`.
    // Items in a section are seperated by a `;` and 
    
    // Sections:
    //  1. share string version (which got us to this function)
    //  2. configuration (including the telemetry level)
    //  3. statistics (including session and instance ids)
    //  4. player data (encoded in base64)
    //  5. the final game board state

    const sections = shareString.split("*");
    const [version, configuration, statistics, playerData, boardState] = sections;

    // Parse the configuration section
    const configurationItems = configuration.split(";").slice(0, -1);
    
    const parsedConfiguartion = {
        telemetryLevel: Number.parseInt(configurationItems[0]),
        lettersInBag: Number.parseInt(configurationItems[1]),
        enableSpecialTiles: configurationItems[2] == "1"
    }

    // Parse the statistics section
    const statisticsItems = statistics.split(";").slice(0, -1);

    const instanceId = statisticsItems[0];
    const sessionId = statisticsItems[1];
    
    const messageIndex = Number.parseInt(statisticsItems[11]);
    const winnerStageFakePlayersMessage = {
        firstMessage: ["Did you see that? They're amazing!", "I'm struggling to keep up!", "They're a LexiQuest champion in the making.",
                        "Their word choices are incredible!", "Their strategy was flawless.", "They are on fire!",
                        "I have to step up my game to compete with this player.", "Can you be on my team?"][messageIndex],

        secondMessage: ["I did! Their vocabulary is impressive!", "They're a genius, no doubt.", "They're destined for greatness.",
                        "Agreed, they absolutely are.", "As it's always.", "What does that even mean?",
                        "You have no chance of beating them.", "There are teams in this game?"][messageIndex]
    }

    const parsedStatistics = {
        highestPlayerCount: Number.parseInt(statisticsItems[2]),
        lobby: {
            gamesStarted: Number.parseInt(statisticsItems[3]),
            timesClickedTutorial: Number.parseInt(statisticsItems[4]),
            timesClickedTrailer: Number.parseInt(statisticsItems[5]),
            timesClickedWebsite: Number.parseInt(statisticsItems[6]),
            timesPlayedDisc: Number.parseInt(statisticsItems[7]),
            timesStoppedDisc: Number.parseInt(statisticsItems[8])
        },
        game: {
            lengthInMiliseconds: Number.parseInt(statisticsItems[9]) / 20 * 1000,
            turns: Number.parseInt(statisticsItems[10])
        }
    }

    // Parse the player data section
    const playerDataItems = playerData.split(";").slice(0, -1);
    let parsedPlayers: PlayerData[] = [];
    
    for (const playerDataItem of playerDataItems) {
        const [encodedMojangProfile, score] = playerDataItem.split("_");
        
        const decodedMojangProfile = JSON.parse(atob(encodedMojangProfile)) as MojangProfile;
        
        // Parse the skin
        let skin;

        // Fallback to the classic Steve skin if the model field isn't present
        let texture = "https://assets.mojang.com/SkinTemplates/steve.png;"
        let model = "classic";

        if (decodedMojangProfile.textures.SKIN?.url) {
            texture = decodedMojangProfile.textures.SKIN.url;
            
            if (decodedMojangProfile.textures.SKIN.metadata) {
                model = decodedMojangProfile.textures.SKIN.metadata.model;
            }
        }

        skin = {
            texture: texture,
            model: model
        }

        // Parse the cape texture
        let cape: string | null;
        if (decodedMojangProfile.textures.CAPE?.url) {
            cape = decodedMojangProfile.textures.CAPE?.url;
        } else {
            cape = null;
        }

        parsedPlayers.push({
            timestamp: new Date(decodedMojangProfile.timestamp),
            username: decodedMojangProfile.profileName,
            uuid: decodedMojangProfile.profileId,
            score: Number.parseInt(score),
            textures: {
                skin: skin,
                cape: cape
            }
        });
    }

    // Parse the board state section
    const tiles: BoardTile[] = [];
    
    for (const tileString of boardState) {
        switch (tileString) {
            case "_":
                tiles.push({type: "empty"});
                break;
            case "D":
                tiles.push({type: "doubleLetterScore"});
                break;
            case "T":
                tiles.push({type: "tripleLetterScore"});
                break;
            case "3":
                tiles.push({type: "plusThreeScore"});
                break;
            case "8":
                tiles.push({type: "plusEightScore"});
                break;
            case "S":
                tiles.push({type: "centerTile"});
                break;
            default:
                tiles.push({type: "filled", letter: tileString});
                break;
        }
    }

    // Now split the board tiles into rows
    const boardTileRows: BoardTile[][] = [];

    for (let i = 0; i < tiles.length; i += boardSize) {
        boardTileRows.push(tiles.slice(i, i + boardSize));
    }

    // And now return the final result
    const output: Version0ShareData = {
        version: 0,
        data: {
            instanceId: instanceId,
            sessionId: sessionId,
            winnerStageFakePlayersMessage: winnerStageFakePlayersMessage,
            configuration: parsedConfiguartion,
            statistics: parsedStatistics,
            players: parsedPlayers,
            boardState: {
                rows: boardTileRows
            }
        }
    }

    return output;
}