function Assign() {
    /*
    - (구조)분해 할당
      > 배열 분해 할당
      > 객체 분해 할당
    */

    // 1. 배열 분해 할당
    // ES5
    const points = [20, 30, 40];
    const x1 = points[0];
    const y1 = points[1];
    const z1 = points[2];
    console.log(`x1=${x1}, y1=${y1}, z1=${z1}`);

    // ES6
    const [x2, y2, z2] = points;
    console.log(`x2=${x2}, y2=${y2}, z2=${z2}`);

    // 두번째 값 무시
    const [x3, , z3] = points;
    console.log(`x3=${x3}, z3=${z3}`);

    //첫번째 값만 넣기
    const [x4] = points;
    console.log(`x4=$[x4]`);

    // 
}
export default ArrowFun;