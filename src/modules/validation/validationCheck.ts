type validationTargetArrayType = {
    key: string,
    value: string,
    type: string
}

type validatedArrayType = {
    key: string,
    message: string
}

export const validationCheck = (validationTargets: Array<validationTargetArrayType>) => {
    let validatedArray: Array<validatedArrayType> = [];
    validationTargets.map(validationTarget => {
        if (validationTarget.type === 'require') {
            return addValidationResult(validationTarget.key, requireValidation(validationTarget.value), validatedArray);
        } else if (validationTarget.type === 'email') {
            return addValidationResult(validationTarget.key, emailValidation(validationTarget.value), validatedArray);
        } else if (validationTarget.type.includes('max')) {
            return addValidationResult(validationTarget.key, maxValidation(validationTarget.value, Number(validationTarget.type.slice(4))), validatedArray);
        }
    })

    return validatedArray
}

const requireValidation = (value: string) => {
    if (value) {
        return null
    } else {
        return '必須項目です。';
    }
}

const emailValidation = (value: string) => {
    const regexp = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (regexp.test(value)) {
        return null;
    } else {
        return 'メールアドレスの形式が異なっています。';
    }
}

const maxValidation = (value: string, length: number) => {
    if (value.length > length) {
        return `${length}文字以内で入力してください。`
    } else {
        return null;
    }
}

const addValidationResult = (key: string, result: string | null, validatedArray: Array<validatedArrayType>) => {
    if (result !== null) {
        validatedArray.push(
            {
                key: key,
                message: result
            }
        )
    }
}
