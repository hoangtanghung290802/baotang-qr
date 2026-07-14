fetch("data/battles.json")
.then(response => response.json())
.then(data => {

    const list = document.getElementById("list");

    list.innerHTML = "";

    if(data.length === 0){

        list.innerHTML = `

        <div class="detail-card">

            <h2>Chưa có dữ liệu trận đánh.</h2>

        </div>

        `;

        return;
    }

    data.forEach(item => {

        list.innerHTML += `

        <a href="battle.html?id=${item.id}" class="card" style="text-decoration:none;display:block;">

            <h3>${item.title}</h3>

            <p>

                📖 Nhấn để xem nội dung chi tiết và nghe thuyết minh.

            </p>

        </a>

        `;

    });

})
.catch(err=>{

    console.error(err);

    document.getElementById("list").innerHTML=`

    <div class="detail-card">

        <h2>Lỗi đọc battles.json</h2>

    </div>

    `;

});