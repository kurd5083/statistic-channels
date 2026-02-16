import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/login";

export const useLogin = (onSuccessCallback?: () => void) => {
    return useMutation({
        mutationFn: ({ username, password }: { username: string, password: string }) => login({ username, password }),
        onSuccess: (res) => {
            localStorage.setItem('token', res.token)
            if(onSuccessCallback) onSuccessCallback();
        }
    })
}
