import 'raty-js/src/raty.css';
import Raty from 'raty-js';

export function initRatings(container) {
  if (!container) return;

  const ratings = container.querySelectorAll('.rating-rate');

  ratings.forEach(el => {
    const score = el.dataset.rating;

    const raty = new Raty(el, {
      score: score,
      readOnly: true,
      half: true,
      starType: 'i',
    });

    raty.init();
  });
}
