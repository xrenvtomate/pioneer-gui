const host_list_btn = document.getElementById("host-btn");
const host_list = document.getElementById("list-host");
var result;
host_list.style.display = "none"

host_list_btn.addEventListener("click", async () => {
  if (host_list.style.display === "none") {
    const response = await fetch("http://127.0.0.1:8000/list/");
    const items = await response.json();
    host_list.innerHTML = "";
    host_list.style.display = "block";
    items.forEach((wifi_name) => {
      connect_btn = document.createElement("button");
      connect_btn.classList.add("btn-connect");
      connect_btn.textContent = "connect";

      el_name = document.createElement("span");
      el_name.textContent = wifi_name;

      const listItem = document.createElement("li");
      listItem.appendChild(el_name)
      listItem.appendChild(connect_btn);
      host_list.appendChild(listItem);

      connect_btn.addEventListener('click', async () => {
        const data = {ssid: wifi_name};
        const response = await fetch('http://localhost:8000/connect_host', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        generateAlert('success', 'ура ура ура')
        console.log(result);
      });
    });
  } else {
    host_list.style.display = "none";
  }
});