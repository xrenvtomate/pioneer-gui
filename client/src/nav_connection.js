const host_list_btn = document.getElementById("host-btn");
const host_list = document.getElementById("list-host");
host_list.style.display = "none";

host_list_btn.addEventListener("click", async () => {
  console.log("QHIGIHQG");
  if (host_list.style.display === "none") {
    console.log(123123);
    const response = await fetch("http://127.0.0.1:8000/list/");
    console.log(23233);
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
      listItem.appendChild(el_name);
      listItem.appendChild(connect_btn);
      host_list.appendChild(listItem);

      connect_btn.addEventListener("click", async () => {
        const data = { ssid: wifi_name };
        const response = await fetch("http://localhost:8000/connect_host", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        generateAlert("success", "ура ура ура");
      });
    });
  } else {
    host_list.style.display = "none";
  }
});


const client_list_btn = document.getElementById("client-btn");
const client_list = document.getElementById("list-client");
client_list.style.display = "none";

client_list_btn.addEventListener("click", async () => {
  console.log("QHIGIHQG");
  if (client_list.style.display === "none") {
    console.log(123123);
    const response = await fetch("http://127.0.0.1:8000/list");
    console.log(23233);
    const items = await response.json();
    client_list.innerHTML = "";
    client_list.style.display = "block";
    items.forEach((wifi_name) => {
      if (!wifi_name.startsWith("beb")) return;
      connect_btn = document.createElement("button");
      connect_btn.classList.add("btn-connect");
      connect_btn.textContent = "connect";

      el_name = document.createElement("span");
      el_name.textContent = wifi_name;

      const listItem = document.createElement("li");
      listItem.appendChild(el_name);
      listItem.appendChild(connect_btn);
      client_list.appendChild(listItem);

      connect_btn.addEventListener("click", async () => {
        const data = { ssid: wifi_name };
        const response = await fetch("http://localhost:8000/connect_client", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        generateAlert("success", "ура ура ура");
      });
    });
  } else {
    client_list.style.display = "none";
  }
});