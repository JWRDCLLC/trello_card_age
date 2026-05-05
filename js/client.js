const ICON = 'https://jwrdcllc.github.io/trello_card_age/icons/clock.svg';
const DAY_MS = 86_400_000;
const REFRESH_SECONDS = 600;

function ageColor(days) {
  if (days < 7)  return 'green';
  if (days < 28) return 'lime';
  if (days < 56) return 'yellow';
  if (days < 84) return 'orange';
  return 'red';
}

function daysSince(date) {
  return Math.floor((Date.now() - date.getTime()) / DAY_MS);
}

function createdFromId(id) {
  return new Date(parseInt(id.substring(0, 8), 16) * 1000);
}

console.log('[card-age] connector loaded, TrelloPowerUp =', typeof TrelloPowerUp);

TrelloPowerUp.initialize({
  'card-badges': function (t) {
    console.log('[card-age] card-badges callback invoked');
    return t.card('id', 'dateLastActivity').then(function (card) {
      console.log('[card-age] card data:', card);
      const ageDays = daysSince(createdFromId(card.id));
      const activeDays = daysSince(new Date(card.dateLastActivity));
      const badges = [
        {
          text: ageDays + 'd',
          color: ageColor(ageDays),
          refresh: REFRESH_SECONDS,
        },
        {
          text: activeDays + 'd',
          icon: ICON,
          refresh: REFRESH_SECONDS,
        },
      ];
      console.log('[card-age] returning badges:', badges);
      return badges;
    });
  },
});
