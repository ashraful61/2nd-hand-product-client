import { useEffect, useState } from "react"

const useUserRole = email => {
    const [userRole, setUserRole] = useState(null);
    const [userRoleLoading, setUserRoleLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`https://used-product-server-six.vercel.app/users/role/${email}`)
                .then(res => res.json())
                .then(data => {
                    setUserRole(data.role);
                    setUserRoleLoading(false);
                })
        }
    }, [email])
    return [userRole, userRoleLoading]
}

export default useUserRole;