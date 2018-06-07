import { BLANK_THUMBNAIL } from '~/constants';

export const tmdbImgPrefix = (w, h) => `https://image.tmdb.org/t/p/w${w}${h ? `_and_h${h}_bestv2` : ''}`;

export const tmdbThumbnailSrc = (media, w, h) => {
  var prefix = tmdbImgPrefix(w, h);
  if(media.profile_path || media.poster_path || media.backdrop_path) {
    return prefix + (media.profile_path || media.poster_path || media.backdrop_path);
  }
  return BLANK_THUMBNAIL;
}
