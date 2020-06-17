/**
 * 上传下载/导入导出
 */
export const downloadExcelUsingBlob = (fileName, content) => {
  const excelData = new Blob([content], { type: 'application/vnd.ms-excell' })
  // for IE
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(excelData, fileName)
  } else {
    // for Non-IE(chrome, firefox etc.)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = window.URL.createObjectURL(excelData)
    a.download = fileName
    a.click()
    a.remove()
    window.URL.revokeObjectURL(a.href)
  }
}