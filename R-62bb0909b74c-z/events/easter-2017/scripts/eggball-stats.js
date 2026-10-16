"use strict";

// Eggball scoreboard columns (tagpro-local's own addition, loaded after easter-2017.js, which hides
// every column except player and captures). The stats come from the game server.
tagpro.ready(function() {
    var columns = [
        ["s-points", "Points", "Points scored: 2 for throwing or catching a Raptor Boat, 1 for any other score"],
        ["s-pops", "Popped", "Times popped"],
        ["s-tackles", "Tackles", "Enemy egg holders you popped"],
        ["s-tackled", "Tackled", "Times an enemy popped you while you held the egg"],
        ["s-passes", "Passes", "Throws caught by a teammate"],
        ["s-incompletions", "Incomplete", "Throws an enemy picked up too late to be an interception"],
        ["s-selfThrows", "Self Throws", "Throws you caught yourself"],
        ["s-dunks", "Dunks", "Self Raptor Boats: your own wall bounce caught in your end zone (no extra points)"],
        ["s-intThrown", "INT Thrown", "Interceptions thrown: throws an enemy caught"],
        ["s-intCaught", "INT Caught", "Interceptions caught: enemy throws you caught"],
        ["s-raptorThrows", "Raptor Throws", "Raptor Boats thrown"],
        ["s-raptorCatches", "Raptor Catches", "Raptor Boats caught"],
    ];

    tagpro.events.register({
        modifyScoreUI: function($table) {
            $table.find("[data-column='captures']").hide();
            var $head = $table.find("thead tr");
            if (!$head.find("th.eggStat").length) {
                var $after = $head.find("th[data-column='player']");
                columns.forEach(function(c) {
                    $after = $("<th class='eggStat'>").text(c[1]).attr("title", c[2]).insertAfter($after);
                });
            }
            $head.find("th.eggStat").show();
            $table.find("tbody.stats tr").not(".template").each(function() {
                var $row = $(this), p = $row.data("model");
                if (!p || $row.find("td.eggStat").length) return;
                var $after = $row.find("td[data-column='player']");
                columns.forEach(function(c) {
                    $after = $("<td class='eggStat'>").text(p[c[0]] || 0).insertAfter($after);
                });
            });
        },
    });
});
