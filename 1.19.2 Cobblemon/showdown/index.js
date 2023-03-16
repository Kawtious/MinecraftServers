/*
 * Copyright (C) 2022 Cobblemon Contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const PokemonShowdown = require('pokemon-showdown');
const battleMap = new Map();

function startBattle(graalShowdown, battleId, requestMessages) {
    const battleStream = new PokemonShowdown.BattleStream();
    battleMap.set(battleId, battleStream);

    // Join messages with new line
    for (const element of requestMessages) {
        battleStream.write(element);
    }

    console.log = console.error = console.warn = function(value) {
        graalShowdown.sendFromShowdown(value);
    };

    // Any battle output then gets written to the execution helper logging mechanism
    (async () => {
        for await (const output of battleStream) {
            graalShowdown.sendFromShowdown(battleId, output)
        }
    })();
}

function sendBattleMessage(battleId, messages) {
    const battleStream = battleMap.get(battleId)
    for (const element of messages) {
      battleStream.write(element);
    }
}