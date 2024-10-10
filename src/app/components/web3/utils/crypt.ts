import CryptoJS from "crypto-js"

const secretKey = process.env.SECRET_KEY!

export function encryptHex(text: string): string {

  const encryptedMessage = CryptoJS.AES.encrypt(
    text,
    CryptoJS.enc.Hex.parse(secretKey),
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  )

  const encryptedHex = encryptedMessage.ciphertext.toString(CryptoJS.enc.Hex)

  return encryptedHex
}

export function decryptHex(encryptedHex: string): string {
  const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedHex)

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encryptedBytes,
  })
  
  const decrypted = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Hex.parse(secretKey), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  
  return decrypted.toString(CryptoJS.enc.Utf8)
}
