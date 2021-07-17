
    (() => {
        var modules = ({
            
                    "./src/title1.js":(module,exports,require)=>{
                        module.exports = 'title1'; //2//1
                    }
                
        });
        var cache = {};
        function require(moduleId) {
          var cachedModule = cache[moduleId];
          if (cachedModule !== undefined) {
            return cachedModule.exports;
          }
          var module = cache[moduleId] = {
            exports: {}
          };
          modules[moduleId](module, module.exports, require);
          return module.exports;
        }
        var exports = {};
        (() => {
         let title1 = require("./src/title1.js");

console.log(title1); //2//1
        })();
      })()
        ;
    