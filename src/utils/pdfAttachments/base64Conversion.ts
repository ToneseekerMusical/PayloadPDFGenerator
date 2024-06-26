export function toBase64(file: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let encoded = reader.result?.toString().replace(/^data:(.*,)?/, '');
      if (encoded !== undefined && (encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      if (encoded === undefined){
        return
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error)
  })
}