import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDD2ODlQYY0qaqgGmDa7aTXTxGk
JG1PjBTNnuZVYhgNl9tR4EV8FfSESs1HFW1Gf6lEiG1THZTIlVVrJQIqA4YZfXtA
+4qurS6QGb5cPN2VFKOufvvC9TNCHf0cyZWvePVPCaU6U2XPNRfBagnWfUFqZe26
+bfZpmjzy4JONr+teQIDAQAB`

const privateKey = `MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMPY4OVBhjSpqqAa
YNrtpNdPEaQkbU+MFM2e5lViGA2X21HgRXwV9IRKzUcVbUZ/qUSIbVMdlMiVVWsl
AioDhhl9e0D7iq6tLpAZvlw83ZUUo65++8L1M0Id/RzJla949U8JpTpTZc81F8Fq
CdZ9QWpl7br5t9mmaPPLgk42v615AgMBAAECgYBkdlIXB9+iEA6Yhi983j6au9Ke
0pjIH2FkgMhCsEkKYAV/IH5EQrblTcGzXwhpC392ykzaP+hcZE4m4hsUFi6o6RRx
/UO2rJBuz6se0IfYygMDJf9W8la5WrhcS62cFyrjLQQ+6nwDCh7Cmy1IEekz2Oo6
7EYt20eT4k1aWzB/AQJBAP7BSb8PlxJzMvlKfxqypVz0gLGtl72lvWdUj8SZD7jE
svJt9UZ3zYTz4hwzHuV2pUKJyqsh3gPBFNRy3Fab9okCQQDEzeTDuZTDDWWf0jHA
700X5LAlth8FMJ4+PMqUHlRjGNkxpO0ALNlT5Nhj4JeGW/1GX3pBgpwGpQOb9e3+
0kNxAkAobkKm+PFv8yp21/TeJtYJr6AxEqzPY1tw58G9YNFW8Ji50uunWGIcpJwQ
/6f6oN7PdZDdog1bKSyGHwiLEkuJAkEAp/U7xlpMfkahs0sVER5pgfm25whN4wUC
GAWTseNMi6I6QmcJqPudoj6M+nhDePRq7DMxyFTqSbVsph61taLG0QJBAK1OVGGq
HpOAzziwLGpVwoGm6FEqREziZNQmeId7dH7ynyZnnnGmWhg+6yS2Yft3t/TcZXuu
t9VT8mOaDvyX9j8=`

// 加密
export function encrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密
export function decrypt (txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}

