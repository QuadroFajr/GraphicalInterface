const path = require('path');
const fs = require('fs');
const esbuild = require('esbuild');

const flags = process.argv.splice(2);

function only_have_specific_flags(flags_to_have) {
    if (flags.length != flags_to_have.length) {
        return false;
    }

    let matched_flags_count = 0;

    flags.forEach((process_flag) => {
        if (flags_to_have.includes(process_flag)) {
            matched_flags_count++;
        }
    });

    return matched_flags_count == flags.length;
}

if (only_have_specific_flags(['--compile'])) {
    compile_program();
} else if (only_have_specific_flags(['--test'])) {
    run_tests();
}