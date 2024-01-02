import { schema, normalize } from "normalizr";

const course = new schema.Entity("courses");

const coursesNormalizer = (data) => {
  return normalize(data, [course]);
};

export default coursesNormalizer;
