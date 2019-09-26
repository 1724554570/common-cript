const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const Base64 = {

    // private property
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

    // public method for encoding
    encode(input: string) {
        let output: string = '';
        let chr1: number = 0;
        let chr2: number = 0;
        let chr3: number = 0;
        let enc1: number = 0;
        let enc2: number = 0;
        let enc3: number = 0;
        let enc4: number = 0;
        let i: number = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = `${output}${keyStr.charAt(enc1)}${keyStr.charAt(enc2)}${keyStr.charAt(enc3)}${keyStr.charAt(enc4)}`;
        } // Whend

        return output;
    }, // End Function encode

    // public method for decoding
    decode(input) {
        let output = '';
        let chr1: number = 0;
        let chr2: number = 0;
        let chr3: number = 0;
        let enc1: number = 0;
        let enc2: number = 0;
        let enc3: number = 0;
        let enc4: number = 0;
        let i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        } // Whend

        output = Base64._utf8_decode(output);

        return output;
    }, // End Function decode

    // private method for UTF-8 encoding
    _utf8_encode(str: string): string {
        let utftext = '';
        str = str.replace(/\r\n/g, '\n');

        for (let n = 0; n < str.length; n++) {
            const code = str.charCodeAt(n);

            if (code < 128) {
                utftext += String.fromCharCode(code);
            } else if ((code > 127) && (code < 2048)) {
                utftext += String.fromCharCode((code >> 6) | 192);
                utftext += String.fromCharCode((code & 63) | 128);
            } else {
                utftext += String.fromCharCode((code >> 12) | 224);
                utftext += String.fromCharCode(((code >> 6) & 63) | 128);
                utftext += String.fromCharCode((code & 63) | 128);
            }

        } // Next n

        return utftext;
    }, // End Function _utf8_encode

    // private method for UTF-8 decoding
    _utf8_decode(utftext: string) {
        let stringCode = '';
        let i = 0;
        let c0: number = 0;
        let c2: number = 0;
        let c3: number = 0;

        while (i < utftext.length) {
            c0 = utftext.charCodeAt(i);

            if (c0 < 128) {
                stringCode += String.fromCharCode(c0);
                i++;
            } else if ((c0 > 191) && (c0 < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                stringCode += String.fromCharCode(((c0 & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                stringCode += String.fromCharCode(((c0 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        } // Whend

        return stringCode;
    } // End Function _utf8_decode

};

export default Base64;
