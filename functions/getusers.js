const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { username } = JSON.parse(event.body || '{}');
    if (!username) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Username is required' }) };
    }
    const { data, error } = await supabase.from('users').select('*').eq('username', username);
    if (error || data.length === 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'User not found' }) };
    }
    return { statusCode: 200, body: JSON.stringify(data[0]) };
};