import defaultAxios from 'axios';
import {useEffect, useState} from "react";

/*
React Hook useEffect has missing dependencies: 'axiosInstance', 'opts', and 'state'. Either include them or remove the dependency array.
If 'axiosInstance' changes too often, find the parent component that defines it and wrap that definition in useCallback.(react-hooks/exhaustive-deps)

원인
    useEffect에서 쓰이는 모든 변수, state는 dependency에 지정되어야 함

해결방법
    1.useEffect의 dependency에 관련된 모든 변수,state를 useEffect dependency에 지정
    2.변수를 함수나 class 외부에 선언
    3.useMemo 사용 - dependency 변경시 re-render를 하는게 아니라 값만 변경된다
    4.useCallback 사용
    5.useEffect내에 모든 dependency를 옮김

    아래코드는 위 방법으로 변경이 불가능
 */
const useAxios = (opts, axiosInstance = defaultAxios ) => {

    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
        url: ''
    })

    const [trigger, setTrigger] = useState(0);

    const refetch = () => {
        setState({...state, loading: true});
        setTrigger(Date.now());
    }

    useEffect(() => {
        axiosInstance(opts).then(data => {
            setState({
                ...state,
                loading: false,
                data
            })
        }).catch(error => {
            setState({
                ...state,
                loading: false,
                error
            })
        })
    }, [trigger])

    return {...state, refetch};
}

export default useAxios;

