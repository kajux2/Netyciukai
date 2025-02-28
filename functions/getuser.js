const { createClient } = require('@supabase/supabase-js');

exports.handler = async () => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { data, error } = await supabase.from('users').select('username, balance, id');
    if (error) {
        return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
    return { statusCode: 200, body: JSON.stringify(data) };
};