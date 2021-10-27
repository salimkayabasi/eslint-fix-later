const parse = (errors) =>
  errors.reduce((acc, err) => {
    const rules = [...new Set(err.messages.map((m) => m.ruleId))].filter(
      Boolean,
    );
    if (rules.length) {
      acc.push({
        filePath: err.filePath,
        rules,
      });
    }
    return acc;
  }, []);

module.exports = parse;
