'use client'
//useRouter는 client component에서만 가능
import { useRouter } from "next/navigation"

export default function DetailLink(){
    const router = useRouter()
    return(
        // router.push('이동할경로') => 페이지 이동 시켜줌
        // router.back() => 뒤로가기 기능
        // router.forward() => 앞으로가기 기능
        // router.refresh() => 새로고침 (전체 브라우저 새로고침 X , 변동일부만 바꿔줌)
        <button onClick={()=>{console.log()}}>버튼</button>
    )
}