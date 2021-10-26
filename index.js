const outputFile = '.fix-later';
module.exports = (param) => {
    const cmd = `eslint ${param} -f ${outputFile}`;
    console.log(cmd);
}
