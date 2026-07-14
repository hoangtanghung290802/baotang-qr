const id = new URLSearchParams(window.location.search).get("id");

const title = document.getElementById("title");
const cover = document.getElementById("cover");
const content = document.getElementById("content");
const player = document.getElementById("player");

fetch("data/battles.json")
.then(res => res.json())
.then(data => {

    const battle = data.find(item => item.id === id);

    if(!battle){

        title.innerHTML = "Không tìm thấy trận đánh";

        content.innerHTML = `
            <div class="detail-card">
                <h2>Không tìm thấy dữ liệu.</h2>
            </div>
        `;

        return;

    }

    document.title = battle.title;

    title.innerHTML = battle.title;

    // ẢNH

    if(battle.image && battle.image !== ""){

        cover.src = battle.image;

        cover.style.display = "block";

        cover.onerror = function(){

            cover.style.display = "none";

        };

    }else{

        cover.style.display = "none";

    }

    // AUDIO

    if(battle.audio && battle.audio !== ""){

        player.src = battle.audio;

        player.style.display = "block";

        player.onerror = function(){

            player.style.display = "none";

        };

    }else{

        player.style.display = "none";

    }

    // NỘI DUNG

    fetch(battle.file)
    .then(r => {

        if(!r.ok){

            throw new Error("Không đọc được file.");

        }

        return r.text();

    })
    .then(html => {

        const parser = new DOMParser();

        const doc = parser.parseFromString(html,"text/html");

        content.innerHTML = doc.body.innerHTML;

    })
    .catch(err => {

        console.error(err);

        content.innerHTML = `
            <div class="detail-card">
                <h2>Lỗi đọc nội dung trận đánh.</h2>
            </div>
        `;

    });

})
.catch(err => {

    console.error(err);

    title.innerHTML = "Lỗi";

    content.innerHTML = `
        <div class="detail-card">
            <h2>Không đọc được battles.json</h2>
        </div>
    `;

});