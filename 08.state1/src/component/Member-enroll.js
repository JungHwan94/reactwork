const Member_enroll = () => {
return (
    <>
        <h1>회원가입</h1>
        이름 : <input name="name"/><br/><br/>
        생년월일 : <input type="date" name="birth" /><br/><br/>
        <select name="location">
            <option value="">선택</option>
            <option value="seoul">서울특별시</option>
            <option value="incheon">인천광역시</option>
            <option value="busan">부산광역시</option>
        </select><br/><br/>
        <textarea name="mylife"/>
    </>
)
}
export default Member_enroll;