export default function sortTableDataByCol(data, sortByColAccessor) {
  return data.sort(function (a, b) {
    const propA = a[sortByColAccessor];
    const propB = b[sortByColAccessor];
    if (propA === propB) return data.indexOf(b) - data.indexOf(a);
    return propB - propA;
  });
}
