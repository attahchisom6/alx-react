const { Seq, Map } = require("immutable");

const printBestStudents = (object) => {
  const filteredObject = Seq(object)
    .filter((student) => student.score >= 70)
    .map((selected) => {
      const immObj = Map(selected);
      const firstName = immObj.get("firstName");
      const lastName = immObj.get("lastName");

      const updatedImmObj = immObj
          .set("firstName", firstName.charAt(0).toUpperCase() + firstName.slice(1))
          .set("lastName", lastName.charAt(0).toUpperCase() + lastName.slice(1));

      return updatedImmObj;
    });

  console.log(JSON.stringify(filteredObject.toJS(), null, 2));
}

module.exports = printBestStudents;
