
const success = (...data) => {
    return {
        success: true,
        data
    }
}

const conflict = (...data) => {
    return {
        success: false,
        data
    }
}

const created = (...data) => {
    return {
        success: true,
        data
    }
}

const forbidden = () => {
    return {
        success: false,
        message: 'invalid credentials'
    }
}

const unauthorized = () => {
    return {
        success: false,
        message: 'unauthorized',
    }
}

const validation = (...data) => {
    return {
        success: false,
        error: [...data]
    }
}

module.exports = {
    success,
    forbidden,
    conflict,
    unauthorized,
    created,
    validation
}
    


