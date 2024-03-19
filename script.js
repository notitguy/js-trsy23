const d = new Date();

// const hour = d.getHours();

const locale = d.toLocaleString("cs-CZ", { month: "long" });

console.log(locale);

// Switch statements