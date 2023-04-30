const con_list_btn = document.getElementById("client-btn");
const con_list = document.getElementById("list-client");
con_list.style.display = "none";

con_list_btn.addEventListener("click", async () => {
  if (con_list.style.display === "none") {
    const response = await fetch("http://127.0.0.1:8000/list/");
    const items = await response.json();
    // console.log(items)
    con_list.innerHTML = "";
    // Create a <ul> element and add it to the page

    // Iterate over the items and add <li> elements to the <ul>
    con_list.style.display = "block";
    items.forEach((wifi_name) => {
      connect_btn = document.createElement("button");
      connect_btn.classList.add("btn-connect");
      connect_btn.textContent = "connect";

      el_name = document.createElement("span");
      el_name.textContent = wifi_name;

      const listItem = document.createElement("li");
      listItem.appendChild(el_name)
      listItem.appendChild(connect_btn);
      con_list.appendChild(listItem);

      connect_btn.addEventListener('click', async () => {
        const data = {ssid: wifi_name};
        const response = await fetch('http://localhost:8000/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result);
      });
    });
  } else {
    con_list.style.display = "none";
  }
});


