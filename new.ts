const regex = new RegExp("time.s*$");
console.log(regex.test("test."));
console.log(/time\.\s*$/.test("time."));
