export const BoardCoordinates = () => {
  return (
    <>
      <ul className="absolute top-0 -left-7 hidden h-full grid-rows-[10] flex-col text-center text-xl font-bold text-cyan-100 md:grid">
        {[...Array(10)].map((e, i) => (
          <li className="flex self-center justify-self-center">{10 - i}</li>
        ))}
      </ul>
      <ul className="absolute -bottom-8 left-0 hidden w-full grid-cols-10 text-xl font-bold text-cyan-100 md:grid">
        {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((e, i) => (
          <li className="flex justify-self-center">{e}</li>
        ))}
      </ul>
    </>
  );
};
