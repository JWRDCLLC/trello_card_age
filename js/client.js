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

TrelloPowerUp.initialize({
  'card-badges': function (t) {
    return t.card('id').then(function (card) {
      const ageDays = daysSince(createdFromId(card.id));
      return [{
        text: 'Age: ' + ageDays + 'd',
        color: ageColor(ageDays),
        refresh: REFRESH_SECONDS,
      }];
    });
  },
});
