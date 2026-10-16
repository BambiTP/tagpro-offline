"use strict";

// Eggball scoreboard columns (tagpro-local's own addition, loaded after easter-2017.js, which hides
// every column except player and captures). The stats come from the game server.
tagpro.ready(function() {
    var columns = [
        ["s-points", "Pts", "Points scored: 2 for throwing or catching a Raptor Boat, 1 for any other score"],
        ["s-pops", "Pops", "Times popped"],
        ["s-tackles", "Tkl", "Tackles: enemy egg holders you popped"],
        ["s-tackled", "Tkd", "Tackled: times an enemy popped you while you held the egg"],
        ["s-passes", "Pass", "Passes: throws caught by a teammate"],
        ["s-incompletions", "Inc", "Incomplete: throws an enemy picked up too late to be an interception"],
        ["s-selfThrows", "Self", "Self throws: throws you caught yourself"],
        ["s-dunks", "Dunk", "Dunks: self Raptor Boats, your own wall bounce caught in your end zone (no extra points)"],
        ["s-intThrown", "INT", "Interceptions thrown: throws an enemy caught"],
        ["s-intCaught", "Pick", "Picks (interceptions caught): enemy throws you caught"],
        ["s-raptorThrows", "RBT", "Raptor Boat throws"],
        ["s-raptorCatches", "RBC", "Raptor Boat catches"],
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
