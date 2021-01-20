const { extname } = require("path")
const fs = require('fs').promises
const { compileTemplate } = require('@vue/compiler-sfc')

module.exports = function () {
  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load (id) {
      if (!extname(id).startsWith('.svg')) {
        return null
      }

      const svg = await fs.readFile(id, 'utf-8')

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        transformAssetUrls: false
      })

      return `${code}\nexport default render`
    }
  }
}
