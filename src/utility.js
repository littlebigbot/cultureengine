import { reduce, isUndefined } from 'lodash';
import { BLANK_THUMBNAIL } from '~/constants';

export const tmdbThumbnailSrc = (media, w, h) => {
  const prefix = `https://image.tmdb.org/t/p/w${w}${h ? `_and_h${h}_bestv2` : ''}`;
  if(media.profile_path || media.poster_path || media.backdrop_path) {
    return prefix + (media.profile_path || media.poster_path || media.backdrop_path);
  }
  return BLANK_THUMBNAIL;
}

export const serialize = (obj) => {
  return reduce(obj, (result, val, key) => {
    if(!isUndefined(val)) {
      return result.concat(`${result === '?' ? '' : '&'}${key}=${encodeURIComponent(val)}`);
    }
    return result;
  }, '?');
}

export const makeUrl = (apiRoot, endpoint) => {
  return endpoint.includes(apiRoot) ? endpoint : apiRoot + endpoint;
}

export const vaporwave = (text) => {
  const vaporMap = {' ':'　', '`' : '`','1' : '１','2' : '２','3' : '３','4' : '４','5' : '５','6' : '６','7' : '７','8' : '８','9' : '９','0' : '０','-' : '－','=' : '＝','~' : '~','!' : '！','@' : '＠','#' : '＃','$' : '＄','%' : '％','^' : '^','&' : '＆','*' : '＊','(' : '（',')' : '）','_' : '_','+' : '＋','q' : 'ｑ','w' : 'ｗ','e' : 'ｅ','r' : 'ｒ','t' : 'ｔ','y' : 'ｙ','u' : 'ｕ','i' : 'ｉ','o' : 'ｏ','p' : 'ｐ','[' : '[',']' : ']','\\' : '\\','Q' : 'Ｑ','W' : 'Ｗ','E' : 'Ｅ','R' : 'Ｒ','T' : 'Ｔ','Y' : 'Ｙ','U' : 'Ｕ','I' : 'Ｉ','O' : 'Ｏ','P' : 'Ｐ','{' : '{','}' : '}','|' : '|','a' : 'ａ','s' : 'ｓ','d' : 'ｄ','f' : 'ｆ','g' : 'ｇ','h' : 'ｈ','j' : 'ｊ','k' : 'ｋ','l' : 'ｌ',';' : '；','\'' : '\＇','A' : 'Ａ','S' : 'Ｓ','D' : 'Ｄ','F' : 'Ｆ','G' : 'Ｇ','H' : 'Ｈ','J' : 'Ｊ','K' : 'Ｋ','L' : 'Ｌ',':' : '：','\'' : '\'','z' : 'ｚ','x' : 'ｘ','c' : 'ｃ','v' : 'ｖ','b' : 'ｂ','n' : 'ｎ','m' : 'ｍ',',' : '，','.' : '．','/' : '／','Z' : 'Ｚ','X' : 'Ｘ','C' : 'Ｃ','V' : 'Ｖ','B' : 'Ｂ','N' : 'Ｎ','M' : 'Ｍ','<' : '<','>' : '>','?' : '？'};
  const charArray = text.split('');
  return charArray.map(char => vaporMap[char] || char).join('');
}
