const form = document.querySelector("#loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const data = {
    email: formData.get("email"), 
    password: formData.get("password"),
  };

 
  if (!data.email || !data.password) {
    alert("შეავსეთ ყველა ველი");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      alert("წარმატებით გაიარეთ ავტორიზაცია!");
    } else {
      alert(result.message || "დაფიქსირდა შეცდომა");
    }
  } catch (err) {
    console.error("შეცდომა:", err);
    alert("დაფიქსირდა შეცდომა");
  }
});
