module.exports = (data) => {
  if (Object.is(data, undefined)) return [];

  const treeDependencies = data.dependencies ? data.dependencies : '';
  
  return Object.keys(treeDependencies).reduce((prevResult, currentModule, index, modules) => {
    if (prevResult.includes(currentModule)) return prevResult;
  
    prevResult.push(`${currentModule}@${treeDependencies[currentModule].version}`);
  
    if ('dependencies' in treeDependencies[currentModule]) {
      prevResult = prevResult.concat(
        getDependencies(treeDependencies[currentModule]).filter(module => !prevResult.includes(module))
      );
    }
  
    return prevResult;
  }, []).sort();
  
}
