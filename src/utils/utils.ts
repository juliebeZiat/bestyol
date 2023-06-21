import { EvolutionAssets, Yol } from "@/type/yol.type"

export const evolutionLevels = [100, 700, 1750]

export const isYolEvolving = (yol: Yol) => {
    return evolutionLevels.includes(yol.xp)
}

export const getEvolutionStep = (yol: Yol) => {
    if (yol) return evolutionLevels.indexOf(yol.xp)
    else return undefined
}

export const getEvolutionAssets = (yol: Yol) => {
    if (yol) {
        let evolutionAssets: EvolutionAssets
        switch (getEvolutionStep(yol)) {
            case 0:
                evolutionAssets = {
                    previousForm: `/assets/yols/egg/animated/${yol.species.name}.gif`,
                    newForm: `/assets/yols/base/static/${yol.species.name}.png`,
                    animatedNewForm: `/assets/yols/base/animated/${yol.species.name}.gif`,
                }
                break

            case 1:
                evolutionAssets = {
                    previousForm: `/assets/yols/base/static/${yol.species.name}.png`,
                    newForm: `/assets/yols/second/static/${yol.species.name}.png`,
                    animatedNewForm: `/assets/yols/second/animated/${yol.species.name}.gif`,
                }
                break

            case 2:
                evolutionAssets = {
                    previousForm: `/assets/yols/second/static/${yol.species.name}.png`,
                    newForm: `/assets/yols/third/static/${yol.species.name}.png`,
                    animatedNewForm: `/assets/yols/third/animated/${yol.species.name}.gif`,
                }
                break

            default:
                evolutionAssets = {
                    previousForm: `/assets/yols/egg/animated/${yol.species.name}.gif`,
                    newForm: `/assets/yols/base/static/${yol.species.name}.png`,
                    animatedNewForm: `/assets/yols/base/animated/${yol.species.name}.gif`,
                }
                break
        }
        return evolutionAssets
    } else return undefined
}