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
    ".travis.yml",
    "phpcs.xml.dist",
    "sass"
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
        copyFile(currentFile);
       }
      else if (stats.isDirectory() && ! excludes.includes(files[i]) ) {
             traverseFileSystem(currentFile);
           }
     }
   };


function copyFile(file) {
    // Do whatever you want to do with the file
    var pathname = path.join(__dirname , '/../../zopi/', file); 

    if (! fs.existsSync(path.dirname(pathname))){
        fs.mkdirSync(path.dirname(pathname));
    }

    fs.readFile(file, 'utf8', function (err,data) {
        fs.writeFile(pathname, data, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });

}

traverseFileSystem('.');