export const nullToNoSetting = (value: string | null | undefined) => {
    return value ? value : '未設定';
}
