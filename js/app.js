fetch("data/museum.json?v=" + Date.now())
.then(response => response.json())
.then(data => {

    const list = document.getElementById("artifact-list");
    const search = document.getElementById("search");

    function render(keyword = "") {

        list.innerHTML = "";

        const result = data.filter(item => {

            const text = JSON.stringify(item).toLowerCase();

            return text.includes(keyword.toLowerCase());

        });

        if(result.length === 0){

            list.innerHTML = `
            <div class="detail-card">
                <h2>Không tìm thấy hiện vật</h2>
            </div>
            `;
            return;
        }

        result.forEach(item => {

            let label = "Số hiệu";
            let value = "";

            if(Array.isArray(item.sohieu)){

                value = item.sohieu.join("<br>");

                if(
                    item.sohieu.length === 1 &&
                    /(Cái|Bộ|Chiếc|Khẩu|Quả|Tấm|Bức|Bình|Máy|Bàn|Ghế)/i.test(item.sohieu[0])
                ){
                    label = "Số lượng";
                }

            }else{

                value = item.sohieu || "";

            }

            list.innerHTML += `

            <div class="card" onclick="window.location='artifact.html?stt=${item.stt}'">

                <h3>${item.ten}</h3>

                ${value!=="" ? `

                <p>

                    <strong>${label}</strong><br>

                    ${value}

                </p>

                ` : ""}

            </div>

            `;

        });

    }

    render();

    search.addEventListener("input",function(){

        render(this.value);

    });

})
.catch(err=>{

    document.getElementById("artifact-list").innerHTML=`

    <div class="detail-card">

        <h2>Lỗi đọc dữ liệu museum.json</h2>

    </div>

    `;

    console.error(err);

});