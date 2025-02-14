function formatDuplicateKeyError(detail: string): string {
  const match = detail.match(/clave.*?\((.*?)\)=\((.*?)\)/);
  if (match && match.length > 2) {
    return `La clave duplicada es: '${match[1]}' con valor '${match[2]}'`;
  }
  return 'Error de clave duplicada.';
}

export default formatDuplicateKeyError;