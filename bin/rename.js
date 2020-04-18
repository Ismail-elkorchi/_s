//requiring path and fs modules
const path = require('path');
const fs = require('fs');


const excludes = [
	".DS_Store",
	".stylelintrc.json",
	".eslintrc",
	".git",
	".gitattributes",
	".github",
	".gitignore",
	"bin",
	"composer.json",
	"composer.lock",
	"node_modules",
	"package-lock.json",
	"package.json",
    "vendor",
    ".travis.yml"
];

///joining path of directory 
const directoryPath = path.join(__dirname, '../');
//passsing directoryPath and callback function
var traverseFileSystem = function (currentPath) {
    var files = fs.readdirSync(currentPath);
    for (var i in files) {
       var currentFile = currentPath + '/' + files[i];
       var stats = fs.statSync(currentFile);
       if (stats.isFile() && ! excludes.includes(files[i]) ) {
        doReplacement(currentFile);
       }
      else if (stats.isDirectory() && ! excludes.includes(files[i]) ) {
             traverseFileSystem(currentFile);
           }
     }
   };


function doReplacement(file) {
    // Do whatever you want to do with the file
    console.log(file); 
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        var result = data;

        if ( file.includes('phpcs.xml.dist') ) {
            result = result.replace(/"_s"/g, '"function_name_"');
        }
        
       // result = result.replace(/@package _s/g, '@package ' + 'my awesome package'.replace(/ /g, '_' ));
        //result = result.replace(/_s-/g, 'prefix-handler'); // Script/style handles.
        //result = result.replace(/'_s'/g, "'text-domain'");  // Textdomains.
        //result = result.replace(/_s_/g, 'function_name_'); // Function names.
        //result = result.replace(/\b_s\b/g, 'Dock_block');
        //result = result.replace(/_S_/g, 'CONST');
        
        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

traverseFileSystem('.');