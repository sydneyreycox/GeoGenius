//Constantly updating script structure written by claude.ai
const tagSelect = document.getElementById('tag-select');

document.querySelector('.play-button').addEventListener('click', function() {
    const tagId = tagSelect.value || 1;
    window.location.href = '/game/' + tagId;
});

tagSelect.addEventListener('change', function() {
    const tagId = tagSelect.value;
    fetch(`/api/leaderboard?tag=${tagId}`)
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('.leaderboard tbody');
        tbody.innerHTML = data.players.map((p, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${p.username}</td>
            <td>${p.score}</td>
          </tr>
        `).join('');
    });
});
