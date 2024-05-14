import { renderParamsParser, renderSVG, traitsParser } from "dob-render-sdk";

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const items = JSON.parse('[{"name":"wuxing_yinyang","traits":[{"String":"3<_>"}]},{"name":"prev.bgcolor","traits":[{"String":"#(70deg, blue, pink, #f00)"}]},{"name":"prev<%v>","traits":[{"String":"(%wuxing_yinyang):[\'#FFFFFF\', \'#FFFFFF\', \'#FFFFFF\', \'#FFFFFF\', \'#FFFFFF\', \'#000000\', \'#000000\', \'#000000\', \'#000000\', \'#000000\'])"}]},{"name":"Spirits","traits":[{"String":"(%wuxing_yinyang):[\'Metal, Golden Body\', \'Wood, Blue Body\', \'Water, White Body\' \'Fire, Red Body\', \'Earth, Colorful Body\']"}]},{"name":"Yin Yang","traits":[{"String":"(%wuxing_yinyang):[\'Yin, Long hair\', \'Yin, Long hair\', \'Yin, Long hair\', \'Yin, Long hair\', \'Yin, Long hair\', \'Yang, Short Hair\', \'Yang, Short Hair\', \'Yang, Short Hair\', \'Yang, Short Hair\', \'Yang, Short Hair\']"}]},{"name":"Talents","traits":[{"String":"(%wuxing_yinyang):[\'Guard\', \'Attack\', \'Death\', \'Revival\', \'Forget\', \'Summon\', \'Prophet\', \'Curse\', \'Hermit\', \'Crown\']"}]},{"name":"Horn","traits":[{"String":"(%wuxing_yinyang):[\'Praetorian Horn\', \'Warrior Horn\', \'Hel Horn\', \'Shaman Horn\', \'Lethe Horn\', \'Bard Horn\', \'Sibyl Horn \', \'Necromancer Horn\', \'Lao Tsu Horn\', \'Caesar Horn\']"}]},{"name":"Wings","traits":[{"String":"Golden Wings"}]},{"name":"Tails<%k: %v>","traits":[{"String":"Meteor Tails<#000*bi>"}]},{"name":"Horseshoes","traits":[{"String":"Dimond Horseshoes"}]},{"name":"Destiny Number","traits":[{"Number":59616}]},{"name":"Lucky Number","traits":[{"Number":35}]}]')

const { traits, indexVarRegister } = traitsParser(items)
const renderOptions = renderParamsParser(traits, indexVarRegister)


const svgCode = await renderSVG(renderOptions)

console.log(svgCode)