export async function processCurrency(currency: string) {
    const result = currency.split(/\r?\n/).map(row => {
        let result = row.split('|');
        result.splice(1, 2);
        return result;
    });
    result.splice(0, 2);
    return result;
}