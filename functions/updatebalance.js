const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { username, balance } = JSON.parse(event.body || '{}');
    if (!username || balance === undefined) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Username and balance are required' }) };
    }
    const { data, error } = await supabase.from('users').update({ balance }).eq('username', username).select();
    if (error) {
        return { statusCode: 400, body: JSON.stringify({ error: error.message }) };
    }
    return { statusCode: 200, body: JSON.stringify(data[0]) };
};